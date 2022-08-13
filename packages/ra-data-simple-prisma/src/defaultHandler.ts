import { AuditOptions } from "./audit/types";
import {
  CreateRequest,
  DeleteManyRequest,
  DeleteRequest,
  GetListRequest,
  GetManyReferenceRequest,
  GetManyRequest,
  GetOneRequest,
  Request,
  Response,
  UpdateManyRequest,
  UpdateRequest,
} from "./Http";
import { DeleteOptions, deleteHandler } from "./deleteHandler";
import { GetListOptions, getListHandler } from "./getListHandler";
import { PrismaClient } from "@prisma/client";
import { UpdateOptions, updateHandler } from "./updateHandler";
import { createHandler, CreateOptions } from "./createHandler";
import { deleteManyHandler } from "./deleteManyHandler";
import { getManyHandler } from "./getManyHandler";
import {
  getManyReferenceHandler,
  GetManyReferenceOptions,
} from "./getManyReferenceHandler";
import { getOneHandler, GetOneOptions } from "./getOneHandler";
import { updateManyHandler } from "./updateManyHandler";

export const defaultHandler = async (
  req: Request,
  res: Response,
  prisma: PrismaClient,
  options?: {
    audit?: AuditOptions;
    create?: CreateOptions;
    delete?: DeleteOptions;
    getList?: GetListOptions;
    getManyReference?: GetManyReferenceOptions;
    getOne?: GetOneOptions;
    update?: UpdateOptions;
  }
) => {
  const modelName = req.body.model || req.body.resource;
  if (!modelName) throw new Error(`model name is empty`);

  const model = prisma[modelName];
  if (!model) throw new Error(`No model found for "${modelName}"`);

  switch (req.body.method) {
    case "getList": {
      return getListHandler(
        req as GetListRequest,
        res,
        model,
        options?.getList
      );
    }
    case "getOne": {
      return getOneHandler(req as GetOneRequest, res, model, options?.getOne);
    }
    case "getMany": {
      return getManyHandler(req as GetManyRequest, res, model);
    }
    case "getManyReference": {
      return getManyReferenceHandler(
        req as GetManyReferenceRequest,
        res,
        model,
        options?.getManyReference
      );
    }
    case "create": {
      return await createHandler(req as CreateRequest, res, model, {
        ...options?.create,
        audit: options?.audit,
      });
    }
    case "update": {
      return await updateHandler(req as UpdateRequest, res, model, {
        ...options?.update,
        audit: options?.audit,
      });
    }
    case "updateMany": {
      return await updateManyHandler(req as UpdateManyRequest, res, model, {
        ...options?.update,
        audit: options?.audit,
      });
    }
    case "delete": {
      return await deleteHandler(req as DeleteRequest, res, model, {
        ...options?.delete,
        audit: options?.audit,
      });
    }
    case "deleteMany": {
      return deleteManyHandler(req as DeleteManyRequest, res, model, {
        ...options?.delete,
        audit: options?.audit,
      });
    }
    default:
      throw new Error("Invalid method");
  }
};
