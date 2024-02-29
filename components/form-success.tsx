import { CheckCircledIcon } from "@radix-ui/react-icons";

interface Props {
  message?: string;
}

function FormSuccess(props: Props) {
  const { message } = props;
  // donde estoy haceindo esta condicion si no le mando nada no se muestra el componenten

  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}

export default FormSuccess;
