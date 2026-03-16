import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
        imports: [
                JwtModule.registerAsync({
                        imports: [ConfigModule],
                        useFactory: (configService: ConfigService) => ({
                                secret: configService.get("ICN_JWT_SECRET"),
                                signOptions: {
                                        expiresIn: "1d"
                                }
                        }),
                        global: true,
                        inject: [ConfigService]
                })
        ]
})
export class CoreSecurityModule {}
