import { Expose } from "class-transformer";

export class Credential {
        @Expose({ name: "access_token" }) accessToken: string;

        constructor(accessToken: string) {
                this.accessToken = accessToken;
        }
}
