import { Module } from "@nestjs/common";
import { tokenProvider } from "../provider/token.provider";

@Module({
        exports: [tokenProvider],
        providers: [tokenProvider]
})
export class TokenModule {}
