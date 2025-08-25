'use client'

export const ConnectButton = ({ disabled }: { disabled: boolean }) => {
    return (
        <div className="flex justify-center mt-4 " >
            <appkit-button disabled={disabled} />
        </div>
    )
}