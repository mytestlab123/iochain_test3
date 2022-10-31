package keeper_test

import (
	"testing"

	testkeeper "github.com/mytestlab123/iochain_test3/testutil/keeper"
	"github.com/mytestlab123/iochain_test3/x/iochaintest3/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.Iochaintest3Keeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
