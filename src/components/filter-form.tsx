import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { strand } from "@/utils/strand";
import { semesters } from "@/utils/semester";
import { useAttendanceContext } from "@/hooks/useAttendance";

type FilterFormProps = {
  onFormSubmission: () => void;
};

export default function FilterForm({ onFormSubmission }: FilterFormProps) {
  const { selectedSemesters, selectedStrands, handleFilterAttendance } =
    useAttendanceContext();
  const {
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      strand: selectedStrands,
      semester: selectedSemesters,
    },
  });
  const strands = strand;

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;

        const filterData = getValues();
        await handleFilterAttendance(filterData.strand, filterData.semester);

        onFormSubmission();
      }}
    >
      <span className="text-xs">Select strand to filter</span>
      {strands.map((strand) => {
        return (
          <div className="space-y-3 my-2" key={strand.id}>
            <div className="flex justify-between px-2 items-center">
              <label
                htmlFor="terms"
                className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {strand.label}
              </label>
              <Controller
                control={control}
                name="strand"
                render={({ field }) => (
                  <Checkbox
                    checked={
                      Array.isArray(field.value)
                        ? field.value.includes(strand.value)
                        : false
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange(
                          Array.isArray(field.value)
                            ? [...field.value, strand.value]
                            : [strand.value]
                        );
                      } else {
                        field.onChange(
                          Array.isArray(field.value)
                            ? field.value.filter(
                                (value: string) => value !== strand.value
                              )
                            : []
                        );
                      }
                    }}
                  />
                )}
              />
            </div>
            <div className="h-px w-full bg-ccdi-blue/10" />
          </div>
        );
      })}
      <span className="text-xs">Select semester to filter</span>
      {semesters.map((semester) => {
        return (
          <div className="space-y-3 my-2" key={semester.id}>
            <div className="flex justify-between px-2">
              <label
                htmlFor="terms"
                className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tabular-nums"
              >
                {semester.label}
              </label>
              <Controller
                control={control}
                name="semester"
                render={({ field }) => (
                  <Checkbox
                    checked={
                      Array.isArray(field.value)
                        ? field.value.includes(semester.value)
                        : false
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange(
                          Array.isArray(field.value)
                            ? [...field.value, semester.value]
                            : [semester.value]
                        );
                      } else {
                        field.onChange(
                          Array.isArray(field.value)
                            ? field.value.filter(
                                (value: string) => value !== semester.value
                              )
                            : []
                        );
                      }
                    }}
                  />
                )}
              />
            </div>
            <div className="h-px w-full bg-ccdi-blue/10" />
          </div>
        );
      })}
      <Button type="submit" size="sm" className="w-full h-10">
        Show results
      </Button>
    </form>
  );
}
