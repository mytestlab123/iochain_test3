package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/mytestlab123/iochain_test3/testutil/keeper"
	"github.com/mytestlab123/iochain_test3/x/iochaintest3/keeper"
	"github.com/mytestlab123/iochain_test3/x/iochaintest3/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.Iochaintest3Keeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
