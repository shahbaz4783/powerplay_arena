import { useState, useEffect } from "react";

interface UseUserAvatarReturn {
  currentAvatar: number;
  setCurrentAvatar: (avatar: number) => void;
}

export function useUserAvatar(userId: number | undefined): UseUserAvatarReturn {
  const [currentAvatar, setCurrentAvatar] = useState<number>(1);

  useEffect(() => {
		if (!userId) return;

		const loadAvatar = async () => {
			try {
				const savedAvatar = localStorage.getItem(`userAvatar_${userId}`);
				if (savedAvatar) {
					setCurrentAvatar(parseInt(savedAvatar, 10));
				} else {
				}
			} catch (error) {
				console.error('Error loading avatar:', error);
			}
		};

		loadAvatar();
	}, [userId]);

	const updateAvatar = (newAvatar: number) => {
		setCurrentAvatar(newAvatar);
		if (userId) {
			localStorage.setItem(`userAvatar_${userId}`, newAvatar.toString());
		}
	};

  return { currentAvatar, setCurrentAvatar: updateAvatar };
}
