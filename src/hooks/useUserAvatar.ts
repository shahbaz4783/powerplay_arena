import { useState, useEffect } from "react";

interface UseUserAvatarReturn {
  currentAvatar: number;
  setCurrentAvatar: (avatar: number) => void;
}

export function useUserAvatar(userId: string | undefined): UseUserAvatarReturn {
  const [currentAvatar, setCurrentAvatar] = useState<number>(1);

  useEffect(() => {
    if (!userId) return;

    // Load the user's avatar from local storage or an API
    const loadAvatar = async () => {
      try {
        const savedAvatar = localStorage.getItem(`userAvatar_${userId}`);
        if (savedAvatar) {
          setCurrentAvatar(parseInt(savedAvatar, 10));
        } else {
          // If no saved avatar, you might want to fetch from an API
          // const response = await fetch(`/api/user/${userId}/avatar`);
          // const data = await response.json();
          // setCurrentAvatar(data.avatarId);
        }
      } catch (error) {
        console.error("Error loading avatar:", error);
      }
    };

    loadAvatar();
  }, [userId]);

  const updateAvatar = (newAvatar: number) => {
    setCurrentAvatar(newAvatar);
    if (userId) {
      localStorage.setItem(`userAvatar_${userId}`, newAvatar.toString());
      // You might also want to update the avatar on your backend
      // fetch(`/api/user/${userId}/avatar`, {
      //   method: 'POST',
      //   body: JSON.stringify({ avatarId: newAvatar }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
    }
  };

  return { currentAvatar, setCurrentAvatar: updateAvatar };
}
