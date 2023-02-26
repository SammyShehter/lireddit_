import {Options} from "@mikro-orm/core"
import path from "path"
import {Post} from "./entities/Post"
import {__prod__} from "./utils/const"

export default {
    dbName: "lireddit",
    user: "postgres",
    password: "postgres",
    type: "postgresql",
    debug: !__prod__,
    entities: [Post],
    migrations: {
        path: path.join(__dirname,"./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
} as Options
