import { SelectTrack, InsertTrack } from "../config/db/schema";
import { createTrack } from "../config/db/queries/insert";
import { getAllTrack, getTrack } from "../config/db/queries/select";
import { updateTrack } from "../config/db/queries/update";
import { deleteTrack } from "../config/db/queries/delete";

class TrackController {

  async create(data: InsertTrack){
    if(!data || data['title'].length <= 0 || data['description'].length <= 0){
      throw new Error("Invalid data")
    }

    const track = await createTrack(data);

    return track;
  }

  async getAll(): Promise<Partial<SelectTrack>[]>{
    const tracks = await getAllTrack();
    console.log(tracks);

    return tracks;
  }

  async get(id: SelectTrack['id']): Promise<Partial<SelectTrack>[]>{
    const track = await getTrack(id);

    return track;
  }

  async update(id: SelectTrack['id'], data: Partial<Omit<SelectTrack, 'id'>>){
    const track = await updateTrack(id, data);

    return track;
  }

  async delete(id: SelectTrack['id']){
    const track = await deleteTrack(id);

    return track;
  }

};

export default TrackController;
