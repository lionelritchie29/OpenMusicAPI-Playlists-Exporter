const { Pool } = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT songs.id, title, performer FROM songs JOIN playlistsongs ON songs.id = playlistsongs.song_id WHERE playlist_id = $1',
      values: [playlistId],
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }
}

module.exports = SongsService;
