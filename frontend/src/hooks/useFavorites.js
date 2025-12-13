// /src/hooks/useFavorites.js

import { useState, useCallback, useEffect } from "react"; // <-- useEffect toevoegen
import { useAuth } from "./useAuth"; // Of waar uw useAuth hook zich bevindt
import axios from "axios"; // Of uw favoriete fetch client
import { mutate } from "swr";

const API_BASE_URL = "http://localhost:3000/api"; // Pas dit aan

export const useFavorites = () => {
  // Haal de momenteel ingelogde gebruiker op.
  const { user, token, refetchUser } = useAuth(); 

  // 1. Initialiseer de state met een lege Set
  const [favDriverIds, setFavDriverIds] = useState(new Set());
  const [favTrackIds, setFavTrackIds] = useState(new Set());

  // 2. Gebruik useEffect om de state te synchroniseren ZODRA de 'user' data beschikbaar is
  useEffect(() => {
    if (user) {
      // CORRECT: Haal de ID uit het geneste 'driver' object
      const initialDriverFavorites = user.favoriteDrivers?.map((f) => f.driver?.id) || [];
      setFavDriverIds(new Set(initialDriverFavorites));

      // CORRECT: Haal de ID uit het geneste 'track' object
      const initialTrackFavorites = user.favoriteTracks?.map((f) => f.track?.id) || [];
      setFavTrackIds(new Set(initialTrackFavorites));
    }
  }, [user]);

  /**
* Controleert of een driverID favoriet is
*/
  const isDriverFavorite = useCallback((id) => favDriverIds.has(id), [favDriverIds]);

  const isTrackFavorite = useCallback((id) => favTrackIds.has(id), [favTrackIds]);

  // /src/hooks/useFavorites.js

  // Importeer 'mutate' of 'refetchUser' op de juiste manier (afhankelijk van je useAuth implementatie)

  const toggleFavorite = useCallback(async (id, type) => {
    const endpoint = type === "driver" ? "driver" : "track";
    const setFunction = type === "driver" ? setFavDriverIds : setFavTrackIds;
    const itemIdValue = Number(id); // Zorg ervoor dat dit een nummer is
    
    // Bepaal de verwachte NIEUWE status VOORDAT de API wordt aangeroepen
    const currentIsFavorite = (type === "driver" ? favDriverIds : favTrackIds).has(itemIdValue);
    const newIsFavorite = !currentIsFavorite; 

    let expectedNewUser = user; // Start met de huidige user data

    // 1. OPTIMISTISCHE UI UPDATE: Pas de lokale state direct aan
    setFunction((prevIds) => {
      const newIds = new Set(prevIds);

      let newFavoritesArray = [...(user[type === "driver" ? "favoriteDrivers" : "favoriteTracks"] || [])];

      const itemKey = type === "driver" ? "driver" : "track";

      if (newIsFavorite) {
        newIds.add(itemIdValue); // Voeg toe aan de Set
        newFavoritesArray.push({ [itemKey]: { id: itemIdValue, name: "Placeholder" } });
      } else {
        newIds.delete(itemIdValue); // Verwijder uit de Set
        newFavoritesArray = newFavoritesArray.filter((f) => f[itemKey]?.id !== itemIdValue);
      }

      expectedNewUser = {
        ...user,
        [type === "driver" ? "favoriteDrivers" : "favoriteTracks"]: newFavoritesArray,
      };
      return newIds;
    });

    try {
      // API call naar de NestJS backend (gebruik je axios/API call hier)
      await axios.patch(`${API_BASE_URL}/users/me/favorites/${endpoint}`, 
        { itemId: itemIdValue },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      mutate("users/me", expectedNewUser, { revalidate: false });
 
      await refetchUser(); 

    } catch (error) {
      console.error(`Fout bij togglen favoriete ${type}:`, error);
      mutate("users/me", user, { revalidate: false });
        
      // 3. ROLLBACK (Als de API faalt): Draai de lokale state terug
      setFunction((prevIds) => {
        const newIds = new Set(prevIds);
        if (currentIsFavorite) { // Terug naar de oude status
          newIds.add(itemIdValue);
        } else {
          newIds.delete(itemIdValue);
        }
        return newIds;
      });

    }
  }, [token, user, refetchUser]); // Dependency array bijwerken

  return {
    isDriverFavorite,
    isTrackFavorite,
    toggleFavoriteDriver: (id) => toggleFavorite(id, "driver"),
    toggleFavoriteTrack: (id) => toggleFavorite(id, "track"),
  };
};