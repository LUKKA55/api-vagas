export class Admin {
	constructor(
		private uid?: string,
		private name?: string,
		private email?: string,
		private tipo?: 'admin',
		private password?: string,
		private created_at?: string,
		private updated_at?: string
	) {}

	// toJson():Admin{
	// 	return new Admin(
	// 		this.uid,
	// 		this.name,
	// 		this.email,
	// 		this.tipo,
	// 		undefined,
	// 		cre
	// 	)
	// }
}
