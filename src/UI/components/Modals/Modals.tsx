import React from "react";
import { IStore, useStore} from "../../../Core/store";
import { useDispatch} from "../../../hooks/useDispatch";
import Upload from "../Upload/Upload";

export const MODALS = {
  UPLOAD_FILES: 'UPLOADS_FILES'
}

const MAP_NAMES_TO_COMPONENTS = {
  [MODALS.UPLOAD_FILES]: Upload,
};

export const Modals = () => {
  const { store, actions } = useStore((store: IStore) => ({
    Modals: store.ModalsEntity
  }));
  const { openedModal, modalProps } = store.Modals;
  const OpenedModal = MAP_NAMES_TO_COMPONENTS[openedModal];
  const dispatch = useDispatch();

  return OpenedModal ? (
    <OpenedModal
      onClose={() => {
        dispatch(actions.Modals.close());
      }}
      title={modalProps.modalTitle}
    />
  ) : null;
};
