import { Button, Container, Form } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "flowbite-react";
export default function NuevoProductoConCategoria({ id, menus, menu }) {
  const [menuCompleto, setMenuCompleto] = useState([]);
  // const [elProducto, setElProducto] = useState({
  //   menu: "",
  //   categoria: "",
  //   producto: [],
  // });
  const [selectedMenu, setSelectedMenu] = useState();
  const [categoriasDelMenu, setCategoriasDelMenu] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState();
  const [producto, setProducto] = useState({ nombre: "", precio: "" });
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});
  const { push } = useRouter();

  useEffect(() => {
    if (!id) {
      (async () => {
        const response = await fetch("http://localhost:3000/api/menu");
        const data = await response.json();
        setMenuCompleto(data);
        setLoading(false);
      })();
    }
  }, []);

  useEffect(() => {
    if (id) {
      // setElProducto({
      //   menu: menu.nombreMenu,
      //   categoria: menu.nombreCategoria,
      //   producto: menu.producto,
      // });
      setSelectedMenu(menu.nombreMenu);
      setSelectedCategoria(menu.nombreCategoria);

      (async () => {
        const menuObtenido = menus.find((m) => m.nombre === menu.nombreMenu);
        if (menuObtenido.categorias) {
          setCategoriasDelMenu(menuObtenido.categorias);
        }
      })();
      setProducto({
        nombre: menu.producto.nombre,
        precio: menu.producto.precio,
      });
      setLoading(false);
    }
  }, []);

  const datosRecopilados = {
    menu: id ? menu.nombreMenu : selectedMenu,
    categoria: id ? menu.nombreCategoria : selectedCategoria,
    producto: id ? menu.producto : producto,
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
    setSelectedMenu(data.value);
    const menuObtenido = id
      ? menus.find((menu) => menu.nombre === menu.nombreMenu)
      : menuCompleto.find((menu) => menu.nombre === data.value);
    setCategoriasDelMenu(menuObtenido.categorias);
  };

  const handleCategoriaChange = (_, data) => {
    setSelectedCategoria(data.value);
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) return setErrors(errors);
    setLoading(true);
    const losDatosRecopilados = {
      menu: id ? menu.nombreMenu : selectedMenu,
      categoria: id ? menu.nombreCategoria : selectedCategoria,
      producto,
    };
    console.log("losDatosRecopilados", losDatosRecopilados);
    if (id) {
      await updateProducto(losDatosRecopilados);
      setLoading(false);
    } else {
      await createProducto(losDatosRecopilados);
      setLoading(false);
    }
  };

  const updateProducto = async (losDatosRecopilados) => {
    setLoading(true);
    const menuEncontrado = menus.find((m) => m.nombre === menu.nombreMenu);
    const idDeLaCategoriaSeleccionada = menuEncontrado.categorias.find(
      (c) => c.nombre === menu.nombreCategoria
    )._id;
    const idDelProducto = menu.producto._id;

    try {
      const response = await fetch("http://localhost:3000/api/menu/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menu_id: menuEncontrado._id,
          categoria_id: idDeLaCategoriaSeleccionada,
          producto_id: idDelProducto,
          elProducto: losDatosRecopilados.producto,
        }),
      });
      //const { mensaje } = await response.json();
      if (response.status === 200) {
      } else {
      }
      push("/menu");
    } catch (error) {
      console.log(error);
    }
  };

  const createProducto = async (datosRecopilados) => {
    try {
      await fetch("http://localhost:3000/api/menu", {
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

  const optionsMenu = (id ? menus : menuCompleto).map((m) => ({
    key: m._id,
    text: m.nombre,
    value: m.nombre,
  }));

  const optionsCategoria = categoriasDelMenu.map((c) => ({
    key: c._id,
    text: c.nombre,
    value: c.nombre,
  }));

  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner Large " />
      </div>
    );
  }
  if ((id && menus.length === 0) || (!id && menuCompleto.length === 0)) {
    return <div>No hay menus</div>;
  }
  return (
    <Container>
      <h1>{id ? "Editar producto" : "Nuevo producto"}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            disabled={id}
            label="Selecciona el menú"
            options={optionsMenu}
            defaultValue={id ? menu.nombreMenu : selectedMenu}
            placeholder="Elije el menú"
            onChange={handleMenuChange}
            error={
              errors.menu ? { content: errors.menu, pointing: "below" } : null
            }
          />
          <Form.Select
            fluid
            disabled={id}
            label="Selecciona la categoria"
            options={optionsCategoria}
            defaultValue={id ? menu.nombreCategoria : selectedCategoria}
            placeholder="Elije la categoría"
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
            defaultValue={
              id ? menu.producto.nombre : datosRecopilados.producto.nombre
            }
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
            defaultValue={
              id ? menu.producto.precio : datosRecopilados.producto.precio
            }
            onChange={handleChange}
            error={
              errors.precio
                ? { content: errors.precio, pointing: "below" }
                : null
            }
          />
        </Form.Group>
        <Button primary>{id ? "Editar producto" : "Agregar producto"}</Button>
      </Form>
    </Container>
  );
}
