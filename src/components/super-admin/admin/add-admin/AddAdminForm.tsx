import Input from "@/components/ui/shared/Input";
import { CreateAdminFormValues } from "@/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface AddAdminFormProps {
  register: UseFormRegister<CreateAdminFormValues>;
  errors: FieldErrors<CreateAdminFormValues>;
}

export default function AddAdminForm({ register, errors }: AddAdminFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.full_name?.message}
          {...register("full_name")}
        />
        <Input
          label="Phone Number"
          type="text"
          placeholder="+20 100 123 4567"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="admin@kemet.edu"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Initial password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nationality"
          type="text"
          placeholder="Egyptian"
          error={errors.nationality?.message}
          {...register("nationality")}
        />
        <Input
          label="Residential Address"
          type="text"
          placeholder="Street Address, City, State, ZIP"
          error={errors.address?.message}
          {...register("address")}
        />
      </div>

      <Input
        label="Join Date"
        type="text"
        placeholder="mm/dd/yyyy"
        error={errors.join_date?.message}
        {...register("join_date")}
      />
    </>
  );
}
