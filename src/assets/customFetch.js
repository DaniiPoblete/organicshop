export const customFetch = (data, id, idType) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			try {
				if (id) {
					let item = data.filter(obj => (obj[idType] === id));
					res(item);
				} else {
					res(data);
				}
			} catch (err) {
				rej(err);
			}
		}, 1000);
	});
};