import NuevoProductoConCategoria from "../new";

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await fetch("http://localhost:3000/api/menu");
  const menus = await res.json();
  const uniqueRes = await fetch("http://localhost:3000/api/menu/" + id);
  const menu = await uniqueRes.json();
  return {
    props: {
      id,
      menus,
      menu: menu || null,
    },
  };
};

export default function EditarMenu({ id, menus, menu }) {
  return <NuevoProductoConCategoria id={id} menus={menus} menu={menu} />;
}
