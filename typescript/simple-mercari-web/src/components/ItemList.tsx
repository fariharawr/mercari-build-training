import { useEffect, useState } from 'react';
import { Item, fetchItems } from '~/api';

const PLACEHOLDER_IMAGE = import.meta.env.VITE_FRONTEND_URL + '/logo192.png';
const BASE_URL = "http://localhost:9000/image/";

interface Prop {
  reload: boolean;
  onLoadCompleted: () => void;
  keyword: string;
}

export const ItemList = ({ reload, onLoadCompleted, keyword }: Prop) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetchItems()
        .then((data) => {
          console.debug('GET success:', data);
          setItems(data.items);
          onLoadCompleted();
        })
        .catch((error) => {
          console.error('GET error:', error);
        });
    };

    if (reload || keyword) {
      fetchData();
    }
  }, [reload, keyword, onLoadCompleted]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="ItemList">
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <div key={item.id} className="Item">
            <img className="Image" src={`${BASE_URL}${item.id}.jpg`} alt={item.name} />

            <p>
              <span>Name: {item.name}</span>
              <br />
              <span>Category: {item.category}</span>
            </p>
          </div>
        ))
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};
