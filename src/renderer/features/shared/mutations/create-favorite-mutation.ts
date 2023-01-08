import { useMutation } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { api } from '/@/renderer/api';
import { FavoriteArgs, LibraryItem, RawFavoriteResponse } from '/@/renderer/api/types';
import { MutationOptions } from '/@/renderer/lib/react-query';
import { useCurrentServer, useSetAlbumListItemDataById } from '/@/renderer/store';

export const useCreateFavorite = (options?: MutationOptions) => {
  const server = useCurrentServer();
  const setAlbumListData = useSetAlbumListItemDataById();

  return useMutation<RawFavoriteResponse, HTTPError, Omit<FavoriteArgs, 'server'>, null>({
    mutationFn: (args) => api.controller.createFavorite({ ...args, server }),
    onSuccess: (_data, variables) => {
      for (const id of variables.query.id) {
        // Set the userFavorite property to true for the album in the album list data store
        if (variables.query.type === LibraryItem.ALBUM) {
          setAlbumListData(id, { userFavorite: true });
        }
      }
    },
    ...options,
  });
};
