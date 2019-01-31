export class AppSettings {
  // public static readonly ApiBaseUrl: string = "https://apilive.techpure.co.uk/";
  public static readonly ApiBaseUrl: string = 'http://localhost:3000/';
  private static _browserUrl: string = window.location.origin;
  public static get BrowserUrl(): string {
    if (this._browserUrl === 'http://localhost:4200') {
      // this._browserUrl = "http://flqa.techpure.co.uk";
    }
    return this._browserUrl;
  }
}
