import { Container, Form } from "semantic-ui-react";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

DetalleDelProducto.titulo ? "Detalle del producto" : "Nuevo producto";
export default function DetalleDelProducto({
  menus,
  menu,
  categoria,
  elProducto,
}) {
  const [selectedMenu, setSelectedMenu] = useState(menu.nombre);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(categoria.nombre);
  const [producto, setProducto] = useState({ nombre: "", precio: "" });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const elMenu = menus.find((m) => m.nombre === menu.nombre);
    setSelectedMenu(elMenu.nombre);
    setCategorias(elMenu.categorias);
  }, [menus, menu.nombre]);

  const datosRecopilados = {
    menu: selectedMenu,
    categoria: selectedCategoria,
    producto,
  };

  const validate = () => {
    const errors = {};
    if (!datosRecopilados.menu) errors.menu = "El menú es requerido";
    if (!datosRecopilados.categoria)
      errors.categoria = "La categoría es requerida";
    if (!datosRecopilados.producto.nombre)
      errors.nombre = "Nombre es requerido";
    if (!datosRecopilados.producto.precio)
      errors.precio = "Precio es requerido";

    return errors;
  };
  const handleMenuChange = (_, data) => {
    const menu = menus.find((menu) => menu.nombre === data.value);
    setCategorias(menu.categorias);
  };

  const handleCategoriaChange = (_, data) => {
    const categoria = categorias.find((c) => c.nombre === data.value);
    setSelectedCategoria(categoria.nombre);
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) return setErrors(errors);

    await createProducto();
  };

  const createProducto = async () => {
    try {
      await fetch("http://localhost:3000/api/menu/inventario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRecopilados),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const optionsMenu = menus.map((m) => ({
    key: m._id,
    text: m.nombre,
    value: m.nombre,
  }));

  const optionsCategoria = categorias.map((c) => ({
    key: c._id,
    text: c.nombre,
    value: c.nombre,
  }));
  if (menus.length === 0) return <div>No hay menus</div>;
  return (
    <div className="container">
      <h1>Nuevo producto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Selecciona el menú"
            defaultValue={menu.nombre}
            options={optionsMenu}
            placeholder="Selecciona el menú"
            onChange={handleMenuChange}
            error={
              errors.menu ? { content: errors.menu, pointing: "below" } : null
            }
          />
          <Form.Select
            fluid
            label="Selecciona la categoria"
            defaultValue={categoria.nombre}
            options={optionsCategoria}
            placeholder="Selecciona la categoría"
            onChange={handleCategoriaChange}
            error={
              errors.categoria
                ? { content: errors.categoria, pointing: "below" }
                : null
            }
          />
          <Form.Input
            fluid
            label="Nombre del producto"
            placeholder="Nombre"
            name="nombre"
            defaultValue={elProducto.nombre}
            onChange={handleChange}
            error={
              errors.nombre
                ? { content: errors.nombre, pointing: "below" }
                : null
            }
          />
          <Form.Input
            fluid
            label="Precio"
            placeholder="Precio"
            name="precio"
            defaultValue={elProducto.precio}
            onChange={handleChange}
            error={
              errors.precio
                ? { content: errors.precio, pointing: "below" }
                : null
            }
          />
        </Form.Group>
        <Button primary>Guardar</Button>
      </Form>
    </div>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch("http://localhost:3000/api/inventario");
  const menus = await res.json();
  const menu = menus.find((m) => {
    return m.categorias.some((c) => c.productos.some((p) => p._id === id));
  });

  const categoria = menu.categorias.find((c) =>
    c.productos.some((p) => p._id === id)
  );
  const elProducto = categoria.productos.find((p) => p._id === id);

  return {
    props: { menus, menu, elProducto, categoria },
  };
}
