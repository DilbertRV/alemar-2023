import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spinner, Label, Select, TextInput, Button } from "flowbite-react";

NuevoProductoConCategoria.titulo = "Nuevo producto";
export default function NuevoProductoConCategoria({ id, menus, menu }) {
  const [menuCompleto, setMenuCompleto] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState();
  const [categoriasDelMenu, setCategoriasDelMenu] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState();
  const [producto, setProducto] = useState({ nombre: "", precio: "" });
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});
  const { push } = useRouter();

  useEffect(() => {
    if (!id) {
      const obtenerMenus = async () => {
        const response = await fetch("http://localhost:3000/api/inventario");
        const data = await response.json();
        setMenuCompleto(data);
        setLoading(false);
      };
      obtenerMenus();
    }
  }, []);

  useEffect(() => {
    if (id) {
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

  const validate = (datosRecopilados) => {
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
  const handleMenuChange = (event) => {
    setSelectedMenu(event.target.value);
    if (event.target.value !== "Elije el menú") {
      const menuObtenido = id
        ? menus.find((menu) => menu.nombre === menu.nombreMenu)
        : menuCompleto.find((menu) => menu.nombre === event.target.value);
      setCategoriasDelMenu(menuObtenido.categorias);
    } else {
      setCategoriasDelMenu([]);
      setSelectedCategoria("");
    }
  };

  const handleCategoriaChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const losDatosRecopilados = {
      menu: id ? menu.nombreMenu : selectedMenu,
      categoria: id ? menu.nombreCategoria : selectedCategoria,
      producto,
    };
    const errors = validate(losDatosRecopilados);
    if (Object.keys(errors).length > 0) return setErrors(errors);
    setLoading(true);
    if (id) {
      //MANDAR MENSAJE DE QUE SE ACTUALIZÓ EL PRODUCTO
      await updateProducto(losDatosRecopilados);
      setLoading(false);
    } else {
      //MANDAR MENSAJE DE QUE SE CREÓ EL PRODUCTO
      await createProducto(losDatosRecopilados);
      setLoading(false);
    }
    //MANDAR NOMBRE DEL MENU Y CATEGORIA PARA QUE SE REDIRECCIONE A LA PAGINA DE INVENTARIO
    //PARA QUE SE MUESTRE EL PRODUCTO CREADO O ACTUALIZADO
  };

  const updateProducto = async (losDatosRecopilados) => {
    setLoading(true);
    const menuEncontrado = menus.find((m) => m.nombre === menu.nombreMenu);
    const idDeLaCategoriaSeleccionada = menuEncontrado.categorias.find(
      (c) => c.nombre === menu.nombreCategoria
    )._id;
    const idDelProducto = menu.producto._id;

    try {
      const res = await fetch(`http://localhost:3000/api/inventario/${id}`, {
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
      if (res.status === 200) {
        push(
          {
            pathname: "/inventario",
            query: {
              mensaje: `${losDatosRecopilados.producto.nombre}`,
              type: "Actualizar",
            },
          },
          undefined,
          { scroll: false },
          "/inventario"
        );
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createProducto = async (datosRecopilados) => {
    try {
      await fetch("http://localhost:3000/api/inventario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosRecopilados),
      });
      push(
        {
          pathname: "/inventario",
          query: {
            mensaje: `${datosRecopilados.producto.nombre}`,
            type: "Agregar",
          },
        },
        undefined,
        { scroll: false },
        "/inventario"
      );
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
    <div className="container">
      <h1>{id ? "Editar producto" : "Nuevo producto"}</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div id="select_menu">
            <div className="mb-2 block">
              <Label htmlFor="menu" value="Selecciona el menú" />
            </div>
            <Select
              disabled={id}
              id="menu"
              placeholder="Elije el menú"
              value={id ? menu.nombreMenu : selectedMenu}
              onChange={handleMenuChange}
            >
              <option>Elije el menú</option>
              {optionsMenu.map((m) => (
                <option key={m.key} value={m.value}>
                  {m.text}
                </option>
              ))}
            </Select>
            <div>
              {errors.menu && (
                <div className="text-red-500 text-sm">{errors.menu}</div>
              )}
            </div>
          </div>
          <div id="select_categoria" aria-disabled={id}>
            <div className="mb-2 block">
              <Label htmlFor="categoria" value="Selecciona la categoría" />
              <Select
                disabled={id}
                id="categoria"
                value={id ? menu.nombreCategoria : selectedCategoria}
                onChange={handleCategoriaChange}
              >
                <option defaultValue="">Elije la categoría</option>
                {optionsCategoria.map((c) => (
                  <option key={c.key} value={c.value}>
                    {c.text}
                  </option>
                ))}
              </Select>
              <div>
                {errors.categoria && (
                  <div className="text-red-500 text-sm">{errors.categoria}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-2 block">
            <Label htmlFor="nombre" value="Nombre" />
            <TextInput
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Nombre"
              shadow={true}
              defaultValue={
                id ? menu.producto.nombre : datosRecopilados.producto.nombre
              }
              onChange={handleChange}
            />
          </div>
          <div>
            {errors.nombre && (
              <div className="text-red-500 text-sm">{errors.nombre}</div>
            )}
          </div>
          <div className="mb-2 block">
            <Label htmlFor="precio" value="Precio" />
            <TextInput
              id="precio"
              name="precio"
              type="number"
              step="any"
              shadow={true}
              defaultValue={
                id ? menu.producto.precio : datosRecopilados.producto.precio
              }
              onChange={handleChange}
            />
          </div>
          <div>
            {errors.precio && (
              <div className="text-red-500 text-sm">{errors.precio}</div>
            )}
          </div>
        </div>
        <Button className="bg-red-500 hover:bg-red-700" type="submit">
          {id ? "Editar producto" : "Agregar producto"}
        </Button>
      </form>
    </div>
  );
}
