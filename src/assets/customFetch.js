export const customFetch = (data, id, idType, page) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				id && (data = data.filter(obj => (obj[idType] === parseInt(id))));
				const res = {
					pageSize: 8,
					products: data.slice(8 * (page - 1), (8 * page)),
					total: data.length
				};
				resolve(res);
			} catch (err) {
				reject(err);
			}
		}, 500);
	});
};