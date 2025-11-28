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

function Card({ card, onLikeToggle }) {
  return (
    <div className="card">
      <div className="card-media">
        <img src={card.image} alt={card.title} loading="lazy" />
        <span className="badge">{card.tag}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{card.title} - {card.price}$</h3>
        <p className="card-desc">{card.description}</p>
        <div className="card-actions">
          <button className="btn ghost" onClick={() => onLikeToggle(card.id)}>
            {card.isLiked ? "★ Liked" : "☆ Like"}
          </button>
          <button className="btn primary">Open</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cards, setCards] = useState(sampleCards);
  const [sortMethod, setSortMethod] = useState("")

  const handleLikeToggle = (cardId) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? { ...card, isLiked: !card.isLiked } : card
      )
    );
  };

  const handleSortMethodChange = (event) => {
    setSortMethod(event.target.value); 
  };

  useEffect(() => {
    let sortedCards = [...cards]

    if (sortMethod === "lowToHigh") {
      sortedCards.sort((a, b) => a.price - b.price)
    } else if (sortMethod === "highToLow") {
      sortedCards.sort((a, b) => b.price - a.price)
    } else if (sortMethod === "a-z") {
      sortedCards.sort((a, b) => a.title.localeCompare(b.title))
    } 
    setCards(sortedCards)
  }, [sortMethod])
  

  const totalLikedCost = cards.filter(card => card.isLiked).reduce((sum, card) => sum + card.price, 0);

  return (
    <>
      <Header />
      <div className="site-main">
        <div className="container">
          <div className="toolbar">
            <h2 id="explore" className="section-title">
              Explore
            </h2>
            <select value={sortMethod} onChange={handleSortMethodChange}>
              <option value="">Sort by...</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="a-z">Title: A-Z</option>
            </select>
          </div>
          <div className="grid">
            {cards.map((c) => (<Card key={c.id} card={c} onLikeToggle={handleLikeToggle}/>))}
          </div>
          <h2>Liked Total Cost - {totalLikedCost}$</h2>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}