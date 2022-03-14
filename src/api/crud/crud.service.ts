import {AbstractSmallCrudService} from "./crud-small.service";
import {IdHolder} from "../api.domain";

export abstract class AbstractCrudService<D, DI extends IdHolder<I>, S extends IdHolder<I>, I> extends AbstractSmallCrudService<D, DI, DI, I> {
}
