import { use, useEffect, useState } from "react";
const sampleCards = [
  {
    id: 1,
    title: "Ocean Retreat",
    description:
      "Calming blue tones and gentle waves. Perfect for focus or relaxation.",
    image:
      "https://images.unsplash.com/photo-1507525428034…",
    tag: "Nature",
    price: 10,
    isLiked: false
  },
  {
    id: 2,
    title: "City Nights",
    description:
      "Skylines, neon, and late-night vibes for your urban inspiration.",
    image:
      "https://images.unsplash.com/photo-1492684223066…",
    tag: "Urban",
    price: 1,
    isLiked: false
  },
  {
    id: 3,
    title: "Forest Walk",
    description: "A path through pines and light — take a breath and reset.",
    image:
      "https://images.unsplash.com/photo-1501785888041…",
    tag: "Outdoors",
    price: 55,
    isLiked: false
  },
  {
    id: 4,
    title: "Minimal Desk",
    description: "Clutter-free workspace for deep work and clean aesthetics.",
    image:
      "https://images.unsplash.com/photo-1497366216548…",
    tag: "Workspace",
    price: 30,
    isLiked: false
  },
  {
    id: 5,
    title: "Golden Desert",
    description: "Warm sands and endless dunes to spark wanderlust.",
    image:
      "https://images.unsplash.com/photo-1551516594-56cb78394645…",
    tag: "Travel",
    price: 20,
    isLiked: false
  },
  {
    id: 6,
    title: "Cozy Reading",
    description: "Soft light, hot tea, and your favorite book.",
    image:
      "https://images.unsplash.com/photo-1496307042754…",
    tag: "Lifestyle",
    price: 100,
    isLiked: false
  },
];

function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <h1 className="logo">Grid Cards</h1>
      </div>
    </header>
  );
}

function Card({ card, onLikeToggle, onDeleteClick, onEditClick, onViewClick}) {
  return (
    <div className="card">
      <div className="card-media">
        <img src={card.image} alt={`${card.title}.png`} loading="lazy" />
        <span className="badge">{card.tag}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">
          {card.title} - {card.price}$
        </h3>
        <p className="card-desc">{card.description}</p>
        <div className="card-actions">
          <button className="btn ghost" onClick={() => onLikeToggle(card.id)}>
            {card.isLiked ? "★ Liked" : "☆ Like"}
          </button>
          <div className="card-actions">
            <button className="btn" onClick={() => onViewClick(card)}>View</button>
            <button className="btn" onClick={() => onEditClick(card)}>Edit</button>
            <button className="btn primary delete-btn" onClick={() => onDeleteClick(card)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewModal({ isVisible, onCancel, card, onLikeToggle}) {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="card modal-size">
        <div className="card-media">
          <img src={card.image} alt={`${card.title}.png`} loading="lazy" />
          <span className="badge">{card.tag}</span>
        </div>
        <div className="card-body">
          <h3 className="card-title">
            {card.title}
          </h3>
          <p className="card-desc">{card.description}</p>
          <p>Price: {card.price}$</p>
          <br></br>
          <hr></hr>
          <br></br>
          <div className="card-actions">
          <button className="btn ghost" onClick={() => onLikeToggle(card.id)}>
            {card.isLiked ? "★ Liked" : "☆ Like"}
          </button>
            <button className="btn" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditModal({ isVisible, onConfirm, onCancel, card }) {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit Modal</h3>
        <div>
          <label>Title</label>
          <input placeholder="Enter cards Title" type="text"/>
          <label>Description</label>
          <input placeholder="Enter cards Description" type="text"/>
          <label>Image</label>
          <input placeholder="Enter cards Image" type="text"/>
          <label>Tag</label>
          <input placeholder="Enter cards Tag" type="text"/>
          <label>Price</label>
          <input placeholder="Enter Cards Price" type="number"/><span>$</span>
        </div>
        <div className="modal-actions">
          <button className="btn primary" onClick={() => onConfirm(card.id)}>Confirm</button>
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ isVisible, onConfirm, onCancel, card }) {
  if (!isVisible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Are you sure you want to delete the card "{card.title}"?</h3>
        <div className="modal-actions">
          <button className="btn primary" onClick={() => onConfirm(card.id)}>Delete</button>
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cards, setCards] = useState(sampleCards);

  const [sortMethod, setSortMethod] = useState("");

  const [showDelModal, setShowDelModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [cardToView, setCardToView] = useState(null);

  const handleLikeToggle = (cardId) => {
    setCards((prevCards) => prevCards.map((card) => card.id === cardId ? { ...card, isLiked: !card.isLiked } : card));
  };

  const handleSortMethodChange = (event) => {
    setSortMethod(event.target.value); 
  };

  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setShowDelModal(true);
  };

  const handleDeleteConfirm = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    setShowDelModal(false);
    setCardToDelete(null);
  };

  const handleDeleteCancel = () => {
      setShowDelModal(false);
      setCardToDelete(null);
  };

  const handleEditClick = (card) => {
    setCardToEdit(card);
    setShowEditModal(true);
  };

  const handleEditConfirm = (card) => {
    setShowEditModal(false);
    setCardToEdit(null)
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    setCardToEdit(null);
  };

  const handleViewClick = (card) => {
    setShowViewModal(true);
    setCardToView(card)
  };

  const handleViewCancel = () => {
    setShowViewModal(false);
    setCardToView(null);
  };

  useEffect(() => {
    let sortedCards = [...cards];

    if (sortMethod === "lowToHigh") {
      sortedCards.sort((a, b) => a.price - b.price);
    } else if (sortMethod === "highToLow") {
      sortedCards.sort((a, b) => b.price - a.price);
    } else if (sortMethod === "a-z") {
      sortedCards.sort((a, b) => a.title.localeCompare(b.title));
    }
    setCards(sortedCards);
  }, [sortMethod]);

  const totalLikedCost = cards
    .filter((card) => card.isLiked)
    .reduce((sum, card) => sum + card.price, 0);

  return (
    <>
      <Header />
      <div className="site-main">
        <div className="container">
          <div className="toolbar">
            <h2 id="explore" className="section-title">
              Explore
            </h2>
            <select className="btn" value={sortMethod} onChange={handleSortMethodChange}>
              <option value="">Sort by...</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="a-z">Title: A-Z</option>
            </select>
          </div>
          <div className="grid">
            {cards.map((c) => (
              <Card
                key={c.id}
                card={c}
                onLikeToggle={handleLikeToggle}
                onDeleteClick={handleDeleteClick}
                onEditClick={handleEditClick}
                onViewClick={handleViewClick}
              />
            ))}
          </div>
          <h2>Liked Total Cost - {totalLikedCost}$</h2>
        </div>
      </div>

      <DeleteModal
        isVisible={showDelModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        card={cardToDelete}
      />

      <EditModal
        isVisible={showEditModal}
        onConfirm={handleEditConfirm}
        onCancel={handleEditCancel}
        card={cardToEdit}
      />

      <ViewModal
        isVisible={showViewModal}
        onCancel={handleViewCancel}
        card={cardToView}
        onLikeToggle={handleLikeToggle}
      />
    </>
  );
}