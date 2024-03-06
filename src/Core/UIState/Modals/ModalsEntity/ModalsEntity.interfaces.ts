export interface IModalProps {
  onConfirm?: (context?: Record<string, any>) => void;
  onCancel?: (context?: Record<string, any>) => void;
  confirmMessage?: string;
  modalTitle?: string;
}

export interface IModalsEntityState {
  openedModal: string;
  modalProps: IModalProps;
}
