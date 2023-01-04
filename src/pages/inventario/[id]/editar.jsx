import NuevoProductoConCategoria from "../new";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await fetch("http://localhost:3000/api/inventario");
  const menus = await res.json();
  const uniqueRes = await fetch("http://localhost:3000/api/inventario/" + id);
  const menu = await uniqueRes.json();
  return {
    props: {
      id,
      menus,
      menu: menu,
    },
  };
};
EditarMenu.titulo = "Detalle del producto";
export default function EditarMenu({ id, menus, menu, titulo }) {
  return (
    <NuevoProductoConCategoria id={id} menus={menus} menu={menu} a={titulo} />
  );
}
