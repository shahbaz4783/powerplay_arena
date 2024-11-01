export const responseMessages = {
	transaction: {
		success: {
			coinsPurchased:
				'Coins purchased successfully! Your balance has been updated.',
			betPlaced: 'Your bet has been placed successfully. Good luck!',
			rewardClaimed: 'Daily reward claimed successfully! Keep up the streak!',
			winningsCredited:
				'Congratulations! Your winnings have been credited to your account.',
		},
		error: {
			insufficientFunds:
				'Insufficient funds. Please add more coins to your account.',
			betFailed: 'Unable to place bet. Please try again.',
			rewardAlreadyClaimed: 'Daily reward already claimed. Come back tomorrow!',
			transactionFailed: 'Transaction failed. Please try again later.',
		},
	},

	match: {
		success: {
			matchCreated: 'Match created successfully. Get ready to play!',
			matchJoined:
				'You have successfully joined the match. Prepare for the toss!',
			matchCompleted: 'Match completed! Check your stats to see how you did.',
			tossWon: 'You won the toss! Choose to bat or bowl.',
			inningsCompleted: 'Innings completed. Switching sides...',
		},
		error: {
			matchCreationFailed: 'Failed to create match. Please try again.',
			matchJoinFailed:
				'Unable to join match. It may be full or no longer available.',
			matchNotFound: 'Match not found. It may have ended or been cancelled.',
			alreadyInMatch:
				'You are already in a match. Complete or forfeit it first.',
			matchCancelled: 'Match cancelled due to insufficient players.',
		},
	},

	user: {
		success: {
			profileUpdated: 'Your profile has been updated successfully.',
			avatarChanged: 'Avatar changed successfully. Looking good!',
			levelUp: "Congratulations! You've leveled up. New challenges await!",
			achievementUnlocked:
				'New achievement unlocked! Check your profile to see it.',
			streakExtended: "Great job! You've extended your daily streak.",
		},
		error: {
			profileUpdateFailed: 'Failed to update profile. Please try again.',
			invalidUsername: 'Invalid username. Please choose a different one.',
			avatarChangeFailed: 'Failed to change avatar. Please try again later.',
			achievementClaimFailed:
				'Unable to claim achievement. You may not meet the requirements yet.',
		},
	},

	gameplay: {
		success: {
			runScored: 'Great shot! You scored {runs} run(s).',
			boundary: "Fantastic! That's a boundary!",
			wicketTaken: "Howzat! You've taken a wicket!",
			overCompleted: 'Over completed. Switching ends...',
			powerplayActivated: 'Powerplay activated! Make it count!',
		},
		error: {
			invalidAction: 'Invalid action. Please choose a valid play.',
			timedOut: 'You took too long to respond. The opposition will play now.',
			connectionLost: 'Connection lost. Attempting to reconnect...',
		},
	},

	shop: {
		success: {
			itemPurchased: 'Item purchased successfully! Check your inventory.',
			giftSent: 'Gift sent successfully to your friend.',
			specialOfferUnlocked: "You've unlocked a special offer! Check the shop.",
		},
		error: {
			purchaseFailed: 'Purchase failed. Please try again.',
			itemOutOfStock: 'This item is currently out of stock. Check back later.',
			giftFailed: 'Failed to send gift. Please try again.',
		},
	},

	general: {
		success: {
			dataLoaded: 'Game data loaded successfully. Enjoy playing!',
			settingsSaved: 'Your settings have been saved successfully.',
		},
		error: {
			dataLoadFailed:
				'Failed to load game data. Please check your connection and try again.',
			maintenanceMode:
				'The game is currently under maintenance. Please try again later.',
			versionOutdated:
				'Your game version is outdated. Please update to the latest version.',
			unexpectedError: 'An unexpected error occurred. Please try again.',
		},
	},
};
