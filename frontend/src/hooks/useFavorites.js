import { useState, useCallback, useEffect } from "react";
import { useAuth } from "./useAuth";
import axios from "axios";
import { mutate } from "swr";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useFavorites = () => {
  const { user, token, refetchUser } = useAuth();

  const isLoggedIn = Boolean(user && token);

  const [favDriverIds, setFavDriverIds] = useState(new Set());
  const [favTrackIds, setFavTrackIds] = useState(new Set());

  useEffect(() => {
    if (!user) return;

    setFavDriverIds(
      new Set(user.favoriteDrivers?.map((f) => f.driver?.id) || []),
    );

    setFavTrackIds(new Set(user.favoriteTracks?.map((f) => f.track?.id) || []));
  }, [user]);

  const isDriverFavorite = useCallback(
    (id) => favDriverIds.has(id),
    [favDriverIds],
  );

  const isTrackFavorite = useCallback(
    (id) => favTrackIds.has(id),
    [favTrackIds],
  );

  const toggleFavorite = useCallback(
    async (id, type) => {
      if (!user || !token) return;

      const endpoint = type === "driver" ? "driver" : "track";
      const setFunction = type === "driver" ? setFavDriverIds : setFavTrackIds;
      const itemIdValue = Number(id);

      const currentIsFavorite = (
        type === "driver" ? favDriverIds : favTrackIds
      ).has(itemIdValue);

      const newIsFavorite = !currentIsFavorite;

      let expectedNewUser = user;

      setFunction((prevIds) => {
        const newIds = new Set(prevIds);

        const key = type === "driver" ? "favoriteDrivers" : "favoriteTracks";
        const itemKey = type === "driver" ? "driver" : "track";

        let newFavoritesArray = [...(user[key] || [])];

        if (newIsFavorite) {
          newIds.add(itemIdValue);
          newFavoritesArray.push({ [itemKey]: { id: itemIdValue } });
        } else {
          newIds.delete(itemIdValue);
          newFavoritesArray = newFavoritesArray.filter(
            (f) => f[itemKey]?.id !== itemIdValue,
          );
        }

        expectedNewUser = {
          ...user,
          [key]: newFavoritesArray,
        };

        return newIds;
      });

      try {
        await axios.patch(
          `${API_BASE_URL}/users/me/favorites/${endpoint}`,
          { itemId: itemIdValue },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        mutate("users/me", expectedNewUser, { revalidate: false });
        await refetchUser();

        toast.success(
          newIsFavorite
            ? `${
              type === "driver" ? "Driver" : "Track"
            } toegevoegd aan favorieten`
            : `${
              type === "driver" ? "Driver" : "Track"
            } verwijderd uit favorieten`,
        );
      } catch (error) {
        console.error(error);

        setFunction((prevIds) => {
          const rollback = new Set(prevIds);
          currentIsFavorite
            ? rollback.add(itemIdValue)
            : rollback.delete(itemIdValue);
          return rollback;
        });
      }
    },
    [user, token, refetchUser, favDriverIds, favTrackIds],
  );

  if (!isLoggedIn) {
    return {
      isDriverFavorite: () => false,
      isTrackFavorite: () => false,
      toggleFavoriteDriver: async () =>
        toast.error("Je moet ingelogd zijn om favorieten te beheren."),
      toggleFavoriteTrack: async () =>
        toast.error("Je moet ingelogd zijn om favorieten te beheren."),
    };
  }

  return {
    isDriverFavorite,
    isTrackFavorite,
    toggleFavoriteDriver: (id) => toggleFavorite(id, "driver"),
    toggleFavoriteTrack: (id) => toggleFavorite(id, "track"),
  };
};
