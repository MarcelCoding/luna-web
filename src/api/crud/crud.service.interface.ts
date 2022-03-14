import {CrudSmallService} from "./crud-small.service.interface";
import {IdHolder} from "../api.domain";

export interface CrudService<D, DI extends IdHolder<I>, I> extends CrudSmallService<D, DI, DI, I> {
}
