import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { searchQuery: "" },
  });

  const submitSearchQuery = (data) => {
    if (
      !data.searchQuery ||
      data?.searchQuery?.length < 1 ||
      typeof data?.searchQuery !== "string"
    )
      return;
    router.push(`/shop?search=${data.searchQuery}`);
    reset();
  };

  return (
    <form className="relative" onSubmit={handleSubmit(submitSearchQuery)}>
      <input
        type="text"
        {...register("searchQuery")}
        placeholder="search..."
        className="rounded-full shadow-[0px_0px_8px_-4px_rgba(0, 0, 0, 0.682)] lg:w-lg pl-8 py-1 text-base font-semibold text-[var(--text-primary-light)]"
      />
      <button
        type="submit"
        className="absolute top-0 h-full left-1 hover:text-[var(--main-primary)] text-[var(--text-primary-light)] text-lg rounded-full p-2"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
