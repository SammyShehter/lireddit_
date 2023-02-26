// TODO: Remove microorm later
import {MikroORM} from "@mikro-orm/core"
import "reflect-metadata"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import mikroOrmConfig from "./mikro-orm.config"
import {PORT, __prod__} from "./utils/const"
import { PostResolver } from "./resolvers/post"

async function main() {
    // db
    const orm = await MikroORM.init(mikroOrmConfig)
    await orm.getMigrator().up()
    console.log("ORM connected: " + (await orm.isConnected()))

    //express
    const app = express()

    //apollo
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver],
            validate: false
        }),
        context: () => ({em: orm.em})
    })

    apolloServer.applyMiddleware({app})

    //ignite
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    })
}

main().catch((err) => console.error(err.message))
