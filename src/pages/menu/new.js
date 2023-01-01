import { Button, Container, Form } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner } from "flowbite-react";
//HAY QUE TERMINAR EL NEW, EL EDIT YA ESTÁ TERMINADO
//EL NEW TIENE QUE GUARDAR EL VALOR DE LOS SELECTS EN EL ESTADO Y LOS PRODUCTOS PARA AGREGAR UNO NUEVO
export default function NuevoProductoConCategoria({ id, menus, menu }) {
  const [menus, setMenus] = useState([]);
  const [menu, setMenu] = useState({ menu: "", categoria: "", producto: [] });
  const [selectedMenu, setSelectedMenu] = useState();
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState();
  const [producto, setProducto] = useState({ nombre: "", precio: "" });
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});
  const { push } = useRouter();

  useEffect(() => {
    //Obtiene todos los menús del API
    const getTodosLosMenus = async () => {
      const res = await fetch("http://localhost:3000/api/menu");
      const allMenus = await res.json();
      setMenus(allMenus);
    };
    getTodosLosMenus();
  }, []);

  useEffect(() => {
    //Si la URL tiene un id, obtiene el menú, categoria, producto[] del API
    if (query.id) {
      const getElMenu = async () => {
        const res = await fetch("http://localhost:3000/api/menu/" + query.id);
        const data = await res.json();
        //setea el menú, categoria, producto[] en el estado
        setMenu({
          menu: data.nombreMenu,
          categoria: data.nombreCategoria,
          producto: data.producto,
        });
        setLoading(false);
      };
      getElMenu();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading === false && menus.length > 0 && menu.menu) {
      //Obtiene el menú del estado y lo setea en los diferentes estados para que cada uno
      //tenga el valor correcto en el formulario de edición
      const elMenu = menus.find((m) => m.nombre === menu.menu);
      setSelectedMenu(elMenu.nombre);
      setCategorias(elMenu.categorias);
      setSelectedCategoria(menu.categoria);
      setProducto(menu.producto);
    }
  }, [menus]);

  const datosRecopilados = {
    menu: menu.menu,
    categoria: menu.categoria,
    producto: menu.producto,
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
    setSelectedMenu(menu.nombre);
    setCategorias(menu.categorias);
    console.log(menu.nombre);
  };

  const handleCategoriaChange = (_, data) => {
    const categoria = categorias.find((c) => c.nombre === data.value);
    setSelectedCategoria(categoria.nombre);
    console.log(categoria.nombre);
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) return setErrors(errors);
    const losDatosRecopilados = {
      ...datosRecopilados,
      menu: selectedMenu,
      categoria: selectedCategoria,
      producto,
    };
    if (query.id) return console.log("Esto es un update"); //await updateProducto(losDatosRecopilados);
    console.log("Esto es una creación"); //await createProducto(losDatosRecopilados);
  };

  const updateProducto = async (updatedDatosRecopilados) => {
    try {
      await fetch("http://localhost:3000/api/menu/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDatosRecopilados),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createProducto = async () => {
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
  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner Large " />
      </div>
    );
  }
  if (menus.length === 0) return <div>No hay menus</div>;
  return (
    <Container>
      <h1>{query.id ? "Editar producto" : "Nuevo producto"}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Selecciona el menú"
            options={optionsMenu}
            defaultValue={menu.menu}
            placeholder="Elije el menú"
            onChange={handleMenuChange}
            error={
              errors.menu ? { content: errors.menu, pointing: "below" } : null
            }
          />
          <Form.Select
            fluid
            label="Selecciona la categoria"
            options={optionsCategoria}
            defaultValue={menu.categoria}
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
            defaultValue={menu.producto.nombre}
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
            defaultValue={menu.producto.precio}
            onChange={handleChange}
            error={
              errors.precio
                ? { content: errors.precio, pointing: "below" }
                : null
            }
          />
        </Form.Group>
        <Button primary>
          {query.id ? "Editar producto" : "Agregar producto"}
        </Button>
      </Form>
    </Container>
  );
}
