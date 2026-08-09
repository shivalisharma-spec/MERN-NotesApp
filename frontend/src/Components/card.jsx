function Card({ note, onEdit, onDelete }) {

  return (
    <div className="card">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <p className="date">{new Date(note.createdAt).toLocaleString()}</p>
      <div className="buttons">
        <button className="edit" onClick={() => onEdit(note)}>Edit</button>
        <button className="delete" onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}

export default Card;