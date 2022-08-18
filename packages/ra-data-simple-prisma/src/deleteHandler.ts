import { AuditOptions } from "./audit/types";
import { DeleteRequest, Response } from "./Http";
import { auditHandler } from "./audit/auditHandler";

export type DeleteOptions = {
  softDeleteField?: string;
  debug?: boolean;
  audit?: AuditOptions;
};

export const deleteHandler = async (
  req: DeleteRequest,
  res: Response,
  model: { update: Function; delete: Function },
  options?: DeleteOptions
) => {
  const { id } = req.body.params;

  const deleted = options?.softDeleteField
    ? await model.update({
        where: { id },
        data: {
          [options?.softDeleteField]: new Date(),
        },
      })
    : await model.delete({
        where: { id },
      });

  if (options?.audit) {
    await auditHandler(req, options?.audit);
  }

  res.json({ data: deleted });
};
