import { Engine } from "eviate";
import {Plugin} from "../plugin"
import { AppMetadata } from "../schema/AppMetadata";
class FileSystem extends Plugin {
    constructor(meta: AppMetadata){
        super(meta)
    }
    public middlewares(app: Engine): void {
        
    }
    public routes(app: Engine): void {
        
    }
}