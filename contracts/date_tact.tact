import "@stdlib/deploy";
import "./date.tact";
message GetDate{
    unixtime: Int as uint64;
}

contract DateTact with Deployable {
    receive(data: GetDate){
        self.reply(data.unixtime.asUnixTimeDateString("/").asComment());
    }
}
