class Listener {
  constructor(songsService, mailService) {
    this._songsService = songsService;
    this._mailService = mailService;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString(),
      );
      const songs = await this._songsService.getSongByPlaylistId(playlistId);
      const result = await this._mailService.sendMail(
        targetEmail,
        JSON.stringify(songs),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
