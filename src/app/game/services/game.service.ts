import { GenerateRoomResponse } from "@/app/game/domain/room"
import { api } from "@/shared/lib/api"

const generateRoom = async () => {
    const resp = await api.post<GenerateRoomResponse>("/game/generate-room")
    return resp.data;
}

const GameService = {
    generateRoom
}

export default GameService