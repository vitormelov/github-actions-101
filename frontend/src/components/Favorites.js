export default function Favorites({ favorites = [1, 2, 3] }) {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>Title/Name</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {favorites.map((item, index) => (
          <tr className={index % 2 === 0 ? "bg-gray-400" : null} key={item.id}>
            <td className="p-1">{item.title || item.name}</td>
            <td className="p-1">{item.release_date.substring(0, 4)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
