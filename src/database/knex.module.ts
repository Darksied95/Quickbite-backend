import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { KnexModule } from "nest-knexjs";

@Global()
@Module({
    imports: [
        KnexModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {

                const config = {
                    config: {
                        client: configService.get('DB_CLIENT'),
                        connection: {
                            host: configService.get('DB_HOST'),
                            port: configService.get('DB_PORT'),
                            user: configService.get('DB_USER'),
                            password: configService.get('DB_PASSWORD'),
                            database: configService.get('DB_NAME')
                        },
                        pool: { min: 2, max: 10 }, // Optional: connection pool settings
                    }
                }
                return config
            },
            inject: [ConfigService],
        })
    ],
    exports: [KnexModule], // Export KnexModule so other modules can use it
})
export class DatabaseModule { }