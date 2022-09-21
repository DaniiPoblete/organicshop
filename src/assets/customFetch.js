export const customFetch = (data) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res(data);
		}, 1000);
	});
};