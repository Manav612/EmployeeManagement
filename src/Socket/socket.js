import io from 'socket.io-client';
const SOCKET_URL =' https://c567-2405-201-201c-88b2-30d8-6613-8e13-db4a.ngrok-free.app'
class WSService {
    initializeSocket=async()=>{
        try {
            this.socket=io(SOCKET_URL,{
                transports:['websocket']
            })
            console.log("initializing socket",this.socket);
            this.socket.on("connect",(data)=>{
                console.log("===connecteddd");
            })
            this.socket.on("disconnect",(data)=>{
                console.log("===disconnecteddd");
            })
            this.socket.on("error",(data)=>{
                console.log("===error",data);
            })
        } catch (error) {
            console.log("not initialised");
        }
    }
    emit(event,data={}){
        this.socket.emit(event,data)
    }
    on(event,cb){
        this.socket.on(event,cb)
    }
    removeListener(listenerName){
        this.socket.removeListener(listenerName)
    }
}
const socketServices=new WSService()
export default socketServices;

