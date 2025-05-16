const { BaseController } = require("./basecontroller_0");

class AlbumController extends BaseController {
	
	async getAlbums() {
		return await this.axiosInstance.get('/albums');
	};

	filterAlbumsByUserId(albums, userId) {
		return albums.filter(album => album.userId === userId);
	};

	validateAlbumsByUserId(albums, expectedCount) {
		expect(albums.length).toBe(expectedCount);
	};
};

module.exports = new AlbumController();