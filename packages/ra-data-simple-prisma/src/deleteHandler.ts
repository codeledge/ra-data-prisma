import { AuditOptions } from "./audit/types";
import { DeleteRequest } from "./Http";
import { auditHandler } from "./audit/auditHandler";

export type DeleteOptions = {
  softDeleteField?: string;
  debug?: boolean;
  audit?: AuditOptions;
};

// NOTE: generic type W is not used in this function yet

export const deleteHandler = async <
  W extends {
    include?: object | null;
    select?: object | null;
    where?: object | null;
  }
>(
  req: DeleteRequest,
  model: { update: Function; delete: Function },
  options?: DeleteOptions
) => {
  const { id } = req.params;

  const deleted = options?.softDeleteField
    ? await model.update({
        where: { id },
        data: {
          [options.softDeleteField]: new Date(),
        },
      })
    : await model.delete({
        where: { id },
      });

  if (options?.audit) {
    await auditHandler(req, options?.audit);
  }

  const response = { data: deleted };

  return response;
};
