import io from 'socket.io-client';
const SOCKET_URL ='https://0aac-2409-40c1-1000-60d3-8c4d-c12-1a17-e330.ngrok-free.app'
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

