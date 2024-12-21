import { token } from './app-config';

export const responseMessages = {
	transaction: {
		success: {
			coinsPurchased:
				'Coins purchased successfully! Your balance has been updated.',
			betPlaced: 'Your bet has been placed successfully. Good luck!',
			rewardClaimed: 'Daily reward claimed successfully! Keep up the streak!',
			winningsCredited:
				'Congratulations! Your winnings have been credited to your account.',
			powerPassPurchased:
				'Power Pass purchased successfully. Enjoy your new benefits!',
			itemSold:
				'Item sold successfully. Coins have been added to your account.',
			tradeCompleted:
				'Trade completed successfully. Check your inventory for updates.',
		},
		error: {
			insufficientBalance: `You dont have enough ${token.name} to complete this transaction`,
			insufficientPass: `You dont have enough ${token.pass}.`,
			betFailed: 'Unable to place bet. Please try again.',
			rewardAlreadyClaimed: 'Daily reward already claimed. Come back tomorrow!',
			transactionFailed: 'Transaction failed. Please try again later.',
			purchaseLimitReached:
				'Purchase limit reached for this item. Try again later.',
			invalidPromoCode: 'Invalid promo code. Please check and try again.',
			paymentDeclined:
				'Payment declined. Please use a different payment method.',
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
			matchInviteSent:
				'Match invite sent successfully. Waiting for opponent to join.',
			tournamentEntered:
				'You have successfully entered the tournament. Good luck!',
			practiceSessionStarted: 'Practice session started. Hone your skills!',
		},
		error: {
			matchCreationFailed: 'Failed to create match. Please try again.',
			matchJoinFailed:
				'Unable to join match. It may be full or no longer available.',
			matchNotFound: 'Match not found. It may have ended or been cancelled.',
			alreadyInMatch:
				'You are already in a match. Complete or forfeit it first.',
			matchCancelled: 'Match cancelled due to insufficient players.',
			tournamentFull:
				'The tournament is already full. Try joining the next one.',
			invalidTeamSelection:
				'Invalid team selection. Please check your team composition.',
			matchmakingFailed:
				'Matchmaking failed. Not enough players in your skill range.',
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
			friendAdded: 'Friend added successfully. Challenge them to a match!',
			skillUpgraded:
				'Skill upgraded successfully. Your player is getting stronger!',
			teamCustomized: 'Team customization saved. Your team is looking great!',
		},
		error: {
			profileUpdateFailed: 'Failed to update profile. Please try again.',
			invalidUsername: 'Invalid username. Please choose a different one.',
			avatarChangeFailed: 'Failed to change avatar. Please try again later.',
			achievementClaimFailed:
				'Unable to claim achievement. You may not meet the requirements yet.',
			userNotFound: 'User not found. Please check the username and try again.',
			friendRequestFailed:
				'Friend request failed. The user may have blocked requests.',
			skillUpgradeFailed:
				'Skill upgrade failed. You may not have enough skill points.',
			dailyLimitReached:
				'Daily limit reached for this action. Try again tomorrow.',
		},
	},

	gameplay: {
		success: {
			runScored: 'Great shot! You scored {runs} run(s).',
			boundary: "Fantastic! That's a boundary!",
			wicketTaken: "Howzat! You've taken a wicket!",
			overCompleted: 'Over completed. Switching ends...',
			powerplayActivated: 'Powerplay activated! Make it count!',
			specialShotUnlocked: "You've unlocked a special shot! Use it wisely.",
			fieldingPositionChanged: 'Fielding position changed successfully.',
			strategicTimeoutTaken: 'Strategic timeout taken. Plan your next moves!',
		},
		error: {
			invalidAction: 'Invalid action. Please choose a valid play.',
			timedOut: 'You took too long to respond. The opposition will play now.',
			connectionLost: 'Connection lost. Attempting to reconnect...',
			illegalDelivery: 'Illegal delivery! Free hit coming up.',
			playerInjured: 'Player injured. Substitute fielder coming in.',
			equipmentFailure:
				'Equipment failure. Please choose a different bat/ball.',
			weatherInterruption:
				'Match interrupted due to weather. Please wait for updates.',
		},
	},

	shop: {
		success: {
			itemPurchased: 'Item purchased successfully!',
			giftSent: 'Gift sent successfully to your friend.',
			specialOfferUnlocked: "You've unlocked a special offer! Check the shop.",
			itemUpgraded: 'Item upgraded successfully. Enjoy the improved stats!',
			customizationApplied: 'Customization applied successfully to your item.',
			subscriptionActivated:
				'Subscription activated. Enjoy your premium benefits!',
			auctionBidPlaced: 'Your bid has been placed successfully. Good luck!',
			exchangeCompleted:
				'The exchange successfully completed. Your balance has been updated.',
		},
		error: {
			itemNotFound:
				'The selected item could not be found. It may have been removed or is no longer available.',
			purchaseFailed: 'Purchase failed. Please try again.',
			itemOutOfStock: 'This item is currently out of stock. Check back later.',
			giftFailed: 'Failed to send gift. Please try again.',
			insufficientLevel:
				'Your level is too low to purchase this item. Keep playing!',
			itemAlreadyOwned: 'You already own this item.',
			auctionEnded: 'The auction has already ended. Better luck next time!',
			tradeOfferRejected:
				'Your trade offer was rejected. Try making a different offer.',
		},
	},

	general: {
		success: {
			dataLoaded: 'Game data loaded successfully. Enjoy playing!',
			settingsSaved: 'Your settings have been saved successfully.',
			feedbackSubmitted:
				'Thank you for your feedback! We appreciate your input.',
			bugReported: "Bug report submitted successfully. We'll look into it.",
			updateCompleted: 'Game updated successfully. Enjoy the new features!',
			serverMaintenance:
				'Server maintenance completed. Thanks for your patience!',
		},
		error: {
			dataLoadFailed:
				'Failed to load game data. Please check your connection and try again.',
			maintenanceMode:
				'The game is currently under maintenance. Please try again later.',
			unexpectedError: 'An unexpected error occurred. Please try again.',
			serverOverloaded:
				'Servers are currently overloaded. Please try again in a few minutes.',
			featureUnavailable:
				'This feature is currently unavailable. Please check back later.',
			regionLocked: 'This feature is not available in your region.',
		},
	},
};
