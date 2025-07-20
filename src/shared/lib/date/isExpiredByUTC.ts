/**
 * Проверяет, истек ли TTL в 24 часа с момента получения данных (до 00:00 следующего дня UTC).
 *
 * @param fetchedAt - ISO-строка или дата получения данных
 * @returns boolean - true, если срок действия истёк
 */
export const isExpiredByUTC = (fetchedAt: string | Date): boolean => {
	const now = new Date();
	const fetchedDate = typeof fetchedAt === 'string' ? new Date(fetchedAt) : fetchedAt;

	const fetchedUTCDate = new Date(Date.UTC(
		fetchedDate.getUTCFullYear(),
		fetchedDate.getUTCMonth(),
		fetchedDate.getUTCDate()
	));

	const expiryTime = new Date(fetchedUTCDate.getTime() + 24 * 60 * 60 * 1000);

	return now.getTime() >= expiryTime.getTime();
};
