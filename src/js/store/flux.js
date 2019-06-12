const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contactList: []
		},
		actions: {
			addContact: (fullname, email, phone, address, gender) => {
				const url = "https://3000-cc2270b7-3663-47df-8934-859f16490208.ws-us0.gitpod.io/person";

				let g = gender === "M" ? "m" : "w";
				let num = "" + Math.floor(Math.random() * 11);
				if (num.length === 1) num = "0" + num;
				let image_url = `http://demos.themes.guide/bodeo/assets/images/users/${g}1${num}.jpg`;

				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						fullname: fullname,
						email: email,
						phone: phone,
						address: address,
						gender: gender,
						image_url: image_url
					})
				}).then(() => {
					fetch(url)
						.then(response => response.json())
						.then(updatedData => {
							setStore({ contactList: updatedData });
						});
				});
			},

			updateContact: (id, fullname, email, phone, address) => {
				const url = "https://3000-cc2270b7-3663-47df-8934-859f16490208.ws-us0.gitpod.io/person/";

				fetch(url + id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: {
						fullname: fullname,
						email: email,
						phone: phone,
						address: address
					}
				}).then(() => {
					fetch(url)
						.then(response => response.json())
						.then(updatedData => {
							setStore({ contactList: updatedData });
						});
				});
			},

			deleteContact: id => {
				const url = "https://3000-cc2270b7-3663-47df-8934-859f16490208.ws-us0.gitpod.io/person/";

				fetch(url + id, {
					method: "DELETE"
				}).then(() => {
					fetch(url)
						.then(response => response.json())
						.then(updatedData => {
							setStore({ contactList: updatedData });
						});
				});
			}
		}
	};
};

export default getState;
