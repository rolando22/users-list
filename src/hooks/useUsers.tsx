import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type User } from '../types.d';
import { getUsers } from '../services/getUsers';

interface PropsQuery {
    users: User[], 
    nextCursor?: number
}

export function useUsers() {
    const { isLoading, isError, isFetching, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<PropsQuery>(
        ['users'],
        getUsers,
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        }
    );
    const users: User[] = data?.pages.flatMap(page => page.users) ?? [];
    
    const mutationDeleteUser = async (uuid: string) => uuid;
    const queryClient = useQueryClient();
    
    const { mutate } = useMutation({
        mutationFn: mutationDeleteUser,
        onSuccess: (uuid: string) => {
            queryClient.setQueryData(['users'], (oldData?: { pageParams?: number, pages: PropsQuery[] }) => {
                if (oldData == null) return
                oldData?.pages.forEach(page => page.users = page.users.filter(user => user.login.uuid !== uuid));
                return oldData;
            });
        },
    });

    const resetUsers = () => refetch();

    const nextPage = () => fetchNextPage();

    return { 
        users, 
        deleteUser: mutate, 
        resetUsers, 
        loading: isLoading, 
        error: isError, 
        fetching: isFetching, 
        nextPage, 
        hasNextPage, 
    };
}
